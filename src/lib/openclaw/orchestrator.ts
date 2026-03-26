import { AgentRole, SWARM_AGENTS } from '@/config/swarm';
import { execSync } from 'child_process';

interface OrchestratorTask {
  role: AgentRole;
  input?: string;
  task?: string; 
  context?: any;
}

interface OrchestratorResponse {
  success: boolean;
  output: string;
  model_used: string;
  error?: string;
}

export class AgentOrchestrator {
  private gatewayUrl: string = 'http://localhost:18791/v1/chat/completions';
  private apiToken: string;

  constructor(apiToken: string) {
    this.apiToken = apiToken;
  }

  async dispatch(task: OrchestratorTask): Promise<OrchestratorResponse> {
    const agent = SWARM_AGENTS[task.role];
    console.log(`[Orchestrator] Dispatching task to ${agent.role}...`);

    const content = task.input ?? task.task ?? '';
    if (!content) throw new Error('Orchestrator received an empty task input');

    try {
      const response = await fetch(this.gatewayUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiToken}`
        },
        body: JSON.stringify({
          model: task.role === AgentRole.EXPERT ? 'expert' : 'main', 
          messages: [
            { role: 'system', content: agent.systemPrompt },
            { role: 'user', content: content }
          ],
          temperature: 0.7,
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error(`OpenClaw Gateway Error: ${response.statusText}`);
      }

      const result = await response.json();
      const output = result.choices[0].message.content;
      const model_used = result.model;

      console.log(`[Orchestrator] ${agent.role} task complete via API. (Model: ${model_used})`);

      return {
        success: true,
        output,
        model_used
      };

    } catch (error: any) {
      console.warn(`[Orchestrator] API dispatch failed, trying CLI fallback for ${agent.role}...`);
      
      try {
        const escapedPrompt = content.replace(/"/g, '\\"');
        const escapedSystem = (agent.systemPrompt || '').replace(/"/g, '\\"');
        
        const agentId = task.role === AgentRole.EXPERT ? 'expert' : 'main';
        const cmd = `openclaw agent --agent ${agentId} -m "System: ${escapedSystem}\n\nUser: ${escapedPrompt}" --json`;
        
        const stdout = execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
        
        const result = JSON.parse(stdout);
        let output = '';
        
        if (result.result?.payloads && result.result.payloads.length > 0) {
          output = result.result.payloads
            .map((p: any) => p.text || '')
            .filter((t: string) => t.length > 0)
            .join('\n\n');
        } else if (result.payloads && result.payloads.length > 0) {
          output = result.payloads
            .map((p: any) => p.text || '')
            .filter((t: string) => t.length > 0)
            .join('\n\n');
        } else if (result.result?.payloads) {
          output = result.result.payloads
            .map((p: any) => p.content || p.text || '')
            .join('\n\n');
        } else if (result.data?.conversation?.turns) {
          const turns = result.data.conversation.turns;
          const lastAssistantTurn = [...turns].reverse().find((t: any) => t.role === 'assistant');
          output = lastAssistantTurn?.content || '';
        } else {
          output = result.output || result.message || stdout;
        }
        
        return {
          success: output.length > 0,
          output,
          model_used: result.data?.model || result.model || 'local-cli'
        };
      } catch (cliError: any) {
        console.error(`[Orchestrator] CLI fallback also failed:`, cliError.message);
        return {
          success: false,
          output: '',
          model_used: 'unknown',
          error: `API Error: ${error.message} | CLI Error: ${cliError.message}`
        };
      }
    }
  }

  async batchDispatch(tasks: OrchestratorTask[], delayMs: number = 500): Promise<OrchestratorResponse[]> {
    const results: OrchestratorResponse[] = [];
    for (const task of tasks) {
      results.push(await this.dispatch(task));
      if (tasks.indexOf(task) < tasks.length - 1) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
    return results;
  }
}
