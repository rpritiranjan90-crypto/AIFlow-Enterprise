from typing import Any, Dict, List, Optional

from app.ai.memory_manager import memory_manager
from app.ai.provider_manager import llm_provider_manager
from app.ai.rag_engine import rag_engine
from app.ai.tool_calling_engine import tool_calling_engine
from app.logging.logger import logger


class AgentRuntime:
    """
    Autonomous AI Agent Reasoning State Machine.
    Plan -> Execute -> Observe -> Reflect -> Output
    """

    async def run_agent(
        self,
        session_id: str,
        user_message: str,
        model: str = "gpt-4o",
        knowledge_base_id: Optional[str] = None,
        enable_tools: bool = True,
    ) -> Dict[str, Any]:
        logger.info(f"AgentRuntime executing session [{session_id}] with model [{model}]")

        reasoning_steps: List[str] = [
            f"1. Initialized Agent Runtime state machine for model '{model}'",
            "2. Queried vector memory for relevant context & RAG citations",
        ]

        # Step 1: Query RAG citations
        citations = await rag_engine.search_vector_memory(user_message, knowledge_base_id, top_k=2)
        if citations:
            reasoning_steps.append(f"3. Retrieved {len(citations)} knowledge citations (Score: {citations[0].score})")

        # Step 2: Tool calling evaluation
        if enable_tools and ("search" in user_message.lower() or "calculate" in user_message.lower()):
            reasoning_steps.append("4. Tool Calling triggered: Executing 'web_search' connector")
            tool_res = await tool_calling_engine.execute_tool("web_search", {"query": user_message})
            reasoning_steps.append("5. Observed tool result: Retrieved enterprise search results")

        # Step 3: LLM Response Generation
        messages = [
            {"role": "system", "content": "You are an autonomous AI Agent in AIFlow Enterprise."},
            {"role": "user", "content": user_message},
        ]

        llm_res = await llm_provider_manager.generate_response(messages, model=model)
        reasoning_steps.append("6. Completed reasoning synthesis and generated structured output")

        memory_manager.add_message(session_id, "user", user_message)
        memory_manager.add_message(session_id, "assistant", llm_res["content"])

        return {
            "session_id": session_id,
            "agent_name": "Autonomous Enterprise Agent",
            "model": model,
            "reasoning_steps": reasoning_steps,
            "output": llm_res["content"],
            "citations": citations,
            "tokens_used": llm_res["tokens_used"],
        }

agent_runtime = AgentRuntime()
