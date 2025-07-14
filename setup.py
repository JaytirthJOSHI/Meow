#!/usr/bin/env python3
"""
Setup script for the MeowLang interpreter
A feline-friendly esoteric programming language
"""

from setuptools import setup, find_packages
import os

# Read the README file
def read_readme():
    with open("README.md", "r", encoding="utf-8") as fh:
        return fh.read()

# Read requirements
def read_requirements():
    with open("requirements.txt", "r", encoding="utf-8") as fh:
        return [line.strip() for line in fh if line.strip() and not line.startswith("#")]

setup(
    name="meowlang",
    version="0.1.0",
    author="Jaytirth Joshi",
    author_email="jay@joshi1.com",
    description="A feline-friendly esoteric programming language",
    long_description=read_readme(),
    long_description_content_type="text/markdown",
    url="https://github.com/jaytirthjoshi/meow",
    project_urls={
        "Bug Reports": "https://github.com/jaytirthjoshi/meow/issues",
        "Source": "https://github.com/jaytirthjoshi/meow",
        "Documentation": "https://github.com/jaytirthjoshi/meow#readme",
        "Web Demo": "https://meowlang.jaytirthjoshi.com",
    },
    packages=find_packages(),
    classifiers=[
        "Development Status :: 4 - Beta",
        "Intended Audience :: Developers",
        "Intended Audience :: Education",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "Programming Language :: Python :: 3.12",
        "Topic :: Software Development :: Interpreters",
        "Topic :: Software Development :: Libraries :: Python Modules",
        "Topic :: Education",
        "Topic :: Games/Entertainment",
    ],
    python_requires=">=3.7",
    install_requires=read_requirements(),
    extras_require={
        "dev": [
            "pytest>=6.0",
            "pytest-cov>=2.0",
            "black>=21.0",
            "flake8>=3.8",
            "mypy>=0.800",
        ],
        "web": [
            "flask>=2.0",
            "flask-cors>=3.0",
        ],
    },
    entry_points={
        "console_scripts": [
            "meow=meowlang.interpreter:main",
        ],
    },
    keywords=[
        "esolang", "programming", "language", "cat", "meow", 
        "inline-comments", "puffup", "shrinktail", "catnap", 
        "scaredycat", "hairball", "pawprint", "hissfit",
        "esoteric", "interpreter", "brainfuck", "educational"
    ],
    include_package_data=True,
    package_data={
        "": ["*.json", "*.md", "*.txt"],
    },
    zip_safe=False,
)