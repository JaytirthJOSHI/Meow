#!/usr/bin/env python3
"""
Setup script for the .meow language interpreter
"""

from setuptools import setup, find_packages

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setup(
    name="meowlang",
    version="0.1.0",
    author="Jaytirth Joshi",
    author_email="jay@joshi1.com",
    description="A feline-friendly esoteric programming language",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/jaytirthjoshi/meow",
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
        "Topic :: Software Development :: Interpreters",
        "Topic :: Software Development :: Libraries :: Python Modules",
    ],
    python_requires=">=3.7",
    entry_points={
        "console_scripts": [
            "meow=meow_interpreter:main",
        ],
    },
    keywords="esolang programming language cat meow inline-comments puffup shrinktail catnap scaredycat hairball pawprint hissfit",
    project_urls={
        "Bug Reports": "https://github.com/jaytirthjoshi/meow/issues",
        "Source": "https://github.com/jaytirthjoshi/meow",
        "Documentation": "https://github.com/jaytirthjoshi/meow#readme",
    },
)