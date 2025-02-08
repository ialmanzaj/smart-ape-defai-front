import { HumanMessage } from "@langchain/core/messages";
import {
  EVENT_TYPE_AGENT,
  EVENT_TYPE_ERROR,
  EVENT_TYPE_TOOLS,
} from "./constants";
import { handleAgentAction } from "./actions";

/**
 * Run the agent autonomously with specified intervals
 *
 * @param agent - The agent executor
 * @param config - Agent configuration
 * @param interval - Time interval between actions in seconds
 */
async function runAutonomousMode(input: any, agent_executor: any, config: any) {
  console.log("Starting autonomous mode...");

  while (true) {
    try {
      const thought =
        "Be creative and do something interesting on the blockchain. " +
        "Choose an action or set of actions and execute it that highlights your abilities.";

      const stream = await agent_executor.stream(
        { messages: [new HumanMessage(thought)] },
        config,
      );

      for await (const chunk of stream) {
        if ("agent" in chunk) {
          const content = chunk.agent.messages[0].content;
          if (content) {
            console.log(formatSse(content, EVENT_TYPE_AGENT));
          }
        } else if ("tools" in chunk) {
          const name = chunk.tools.messages[0].name;
          const content = chunk.tools.messages[0].content;
          if (content) {
            console.log(formatSse(content, EVENT_TYPE_TOOLS, [name]));
            handleAgentAction(name, content);
          }
        }
        console.log("-------------------");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(formatSse(`Error: ${error.message}`, EVENT_TYPE_ERROR));
      }
      process.exit(1);
    }
  }
}

function formatSse(content: string, eventType: string, functions?: string[]) {
  return JSON.stringify({
    event: eventType,
    data: content,
    functions: functions || [],
  });
}
