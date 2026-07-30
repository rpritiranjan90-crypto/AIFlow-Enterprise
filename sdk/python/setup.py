from setuptools import setup, find_packages

setup(
    name="aiflow-sdk",
    version="4.0.0",
    description="Official Python SDK for AIFlow Enterprise Autonomous AI OS & Workflow Engine",
    author="AIFlow Enterprise Team",
    packages=find_packages(),
    install_requires=[
        "requests>=2.31.0",
        "pydantic>=2.0.0",
    ],
    python_requires=">=3.9",
)
