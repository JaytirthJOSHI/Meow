"""
MeowLang - A feline-friendly esoteric programming language

A Python implementation of the .meow programming language where every command
sounds like a cat! Perfect for learning programming concepts in a fun way.

Example:
    >>> from meowlang import MeowInterpreter
    >>> interpreter = MeowInterpreter()
    >>> result = interpreter.run('meow meow meow purr')
    >>> print(result)
    3

Installation:
    pip install meowlang

Web Demo:
    Visit https://meowlang.jaytirthjoshi.com for an interactive demo
"""

from .interpreter import MeowInterpreter

__version__ = "0.1.0"
__author__ = "Jaytirth Joshi"
__email__ = "jay@joshi1.com"

__all__ = ["MeowInterpreter"] 