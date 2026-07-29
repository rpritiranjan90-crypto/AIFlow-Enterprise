from typing import Dict, List


class MemoryManager:
    """
    Manages short-term conversation buffers and long-term workspace memory.
    """
    def __init__(self):
        self.sessions: Dict[str, List[Dict[str, str]]] = {}

    def add_message(self, session_id: str, role: str, content: str):
        if session_id not in self.sessions:
            self.sessions[session_id] = []
        self.sessions[session_id].append({"role": role, "content": content})

    def get_history(self, session_id: str, limit: int = 10) -> List[Dict[str, str]]:
        return self.sessions.get(session_id, [])[-limit:]

memory_manager = MemoryManager()
