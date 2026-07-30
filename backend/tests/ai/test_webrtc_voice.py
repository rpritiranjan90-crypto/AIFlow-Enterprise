"""
Unit and integration tests for Real-Time WebRTC Voice & Multimodal AI Agent Engine.
"""

import pytest
from app.ai.webrtc_voice_engine import webrtc_voice_engine


@pytest.mark.asyncio
async def test_webrtc_voice_session_lifecycle():
    sess = webrtc_voice_engine.create_voice_session("tenant_voice_01", voice="nova")
    assert sess.session_id is not None
    assert sess.voice == "nova"
    assert sess.status == "connected"

    audio_res = await webrtc_voice_engine.process_audio_chunk(
        session_id=sess.session_id,
        audio_payload_base64="dummy_audio_chunk",
    )
    assert audio_res["session_id"] == sess.session_id
    assert audio_res["latency_ms"] < 200
    assert audio_res["response_text"] is not None


@pytest.mark.asyncio
async def test_webrtc_vision_frame_analysis():
    sess = webrtc_voice_engine.create_voice_session("tenant_voice_02")

    vision_res = await webrtc_voice_engine.process_vision_frame(
        session_id=sess.session_id,
        image_frame_base64="dummy_jpg_frame",
    )
    assert vision_res["session_id"] == sess.session_id
    assert len(vision_res["detected_objects"]) >= 2
