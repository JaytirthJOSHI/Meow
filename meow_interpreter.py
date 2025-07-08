#!/usr/bin/env python3
"""
MeowLang Interpreter (.meow)
A feline-friendly esoteric programming language where every command sounds like a cat!
"""

import sys
import re
import time
import random
from typing import List, Dict, Any

class MeowInterpreter:
    def __init__(self):
        self.memory = 0
        self.output = []
        self.loop_stack = []
        self.program_counter = 0
        self.commands = []
        
    def reset(self):
        """Reset the interpreter state"""
        self.memory = 0
        self.output = []
        self.loop_stack = []
        self.program_counter = 0
        self.commands = []
    
    def parse_program(self, source_code: str) -> List[str]:
        """Parse the source code into commands, filtering out comments and emojis"""
        lines = source_code.strip().split('\n')
        commands = []
        
        for line in lines:
            line = line.strip()
            if not line or line.startswith('🐾'):
                continue
            
            # Remove emoji comments
            clean_line = re.sub(r'🐾.*🐾', '', line).strip()
            if clean_line:
                commands.append(clean_line)
        
        return commands
    
    def execute_command(self, command: str):
        """Execute a single .meow command"""
        if command == 'meow':
            self.memory += 1
        elif command == 'hiss':
            self.memory -= 1
        elif command == 'purr':
            self.output.append(str(self.memory))
        elif command == 'nap':
            pass  # No-op
        elif command == 'scratch':
            self.memory = 0
        elif command == 'lick':
            self.memory *= 2
        elif command == 'zoomies':
            self.memory = self.memory ** 2
        elif command == 'yowl':
            self.loop_stack.append(self.program_counter)
        elif command == 'paw':
            if self.loop_stack:
                if self.memory != 0:
                    # Jump back to start of loop
                    self.program_counter = self.loop_stack[-1] - 1
                else:
                    # Exit loop
                    self.loop_stack.pop()
        elif command == 'sleep':
            # Sleep for memory value milliseconds
            sleep_time = self.memory / 1000.0  # Convert to seconds
            if sleep_time > 0:
                time.sleep(sleep_time)
        elif command == 'chase':
            # Set memory to a random integer between 0 and 9
            self.memory = random.randint(0, 9)
        elif command == 'mew':
            try:
                user_input = input('mew? ')
                self.memory = int(user_input)
            except Exception:
                print("Warning: Invalid input for 'mew', setting memory to 0", file=sys.stderr)
                self.memory = 0
        elif command.startswith('pounce'):
            parts = command.split()
            if len(parts) == 2 and parts[1].isdigit():
                line_num = int(parts[1])
                if 1 <= line_num <= len(self.commands):
                    self.program_counter = line_num - 1  # 0-based index
                    return  # Skip incrementing program_counter below
                else:
                    print(f"Warning: pounce to invalid line {line_num}", file=sys.stderr)
            else:
                print("Warning: Invalid pounce syntax. Use 'pounce <line_number>'", file=sys.stderr)
        else:
            print(f"Warning: Unknown command '{command}' ignored", file=sys.stderr)
    
    def run(self, source_code: str) -> str:
        """Run a .meow program and return the output"""
        self.reset()
        self.commands = self.parse_program(source_code)
        
        while self.program_counter < len(self.commands):
            command = self.commands[self.program_counter]
            self.execute_command(command)
            self.program_counter += 1
        
        return '\n'.join(self.output)
    
    def run_file(self, filename: str) -> str:
        """Run a .meow file and return the output"""
        try:
            with open(filename, 'r', encoding='utf-8') as f:
                source_code = f.read()
            return self.run(source_code)
        except FileNotFoundError:
            print(f"Error: File '{filename}' not found", file=sys.stderr)
            return ""
        except Exception as e:
            print(f"Error reading file: {e}", file=sys.stderr)
            return ""

def main():
    """Main entry point for the .meow interpreter"""
    if len(sys.argv) < 2:
        print("MeowLang Interpreter")
        print("Usage: python meow_interpreter.py <filename.meow>")
        print("   or: python meow_interpreter.py -e '<code>'")
        return
    
    interpreter = MeowInterpreter()
    
    if sys.argv[1] == '-e' and len(sys.argv) > 2:
        # Execute code from command line
        code = sys.argv[2]
        result = interpreter.run(code)
        print(result)
    else:
        # Execute file
        filename = sys.argv[1]
        result = interpreter.run_file(filename)
        print(result)

if __name__ == "__main__":
    main()