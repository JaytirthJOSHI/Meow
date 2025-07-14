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
        self.memory = [0]  # Memory tape
        self.pointer = 0   # Current cell pointer
        self.output = []
        self.loop_stack = []
        self.program_counter = 0
        self.commands = []
        
    def reset(self):
        """Reset the interpreter state"""
        self.memory = [0]
        self.pointer = 0
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
            if not line:
                continue
            # Remove everything after 🐾 (inline or full-line comment)
            if '🐾' in line:
                line = line.split('🐾', 1)[0].strip()
            if line:
                # Split the line into individual commands
                line_commands = line.split()
                commands.extend(line_commands)
        
        return commands
    
    def execute_command(self, command: str):
        """Execute a single .meow command"""
        if command == 'meow':
            self.memory[self.pointer] += 1
        elif command == 'hiss':
            self.memory[self.pointer] -= 1
        elif command == 'purr':
            self.output.append(str(self.memory[self.pointer]))
        elif command == 'nap':
            pass  # No-op
        elif command == 'scratch':
            self.memory[self.pointer] = 0
        elif command == 'lick':
            self.memory[self.pointer] *= 2
        elif command == 'stretch':
            self.memory[self.pointer] = abs(self.memory[self.pointer])
        elif command == 'zoomies':
            self.memory[self.pointer] = self.memory[self.pointer] ** 2
        elif command == 'left':
            if self.pointer > 0:
                self.pointer -= 1
            else:
                self.memory.insert(0, 0)
                # pointer stays at 0
        elif command == 'right':
            self.pointer += 1
            if self.pointer == len(self.memory):
                self.memory.append(0)
        elif command == 'groom':
            self.memory.sort()
        elif command == 'yowl':
            self.loop_stack.append(self.program_counter)
        elif command == 'paw':
            if self.loop_stack:
                if self.memory[self.pointer] != 0:
                    # Jump back to start of loop
                    self.program_counter = self.loop_stack[-1] - 1
                else:
                    # Exit loop
                    self.loop_stack.pop()
        elif command == 'sleep':
            # Sleep for memory value milliseconds
            sleep_time = self.memory[self.pointer] / 1000.0  # Convert to seconds
            if sleep_time > 0:
                time.sleep(sleep_time)
        elif command.startswith('chase'):
            parts = command.split()
            if len(parts) == 1:
                # No arguments: default 0-9
                self.memory[self.pointer] = random.randint(0, 9)
            elif len(parts) == 3 and parts[1].lstrip('-').isdigit() and parts[2].lstrip('-').isdigit():
                min_val = int(parts[1])
                max_val = int(parts[2])
                if min_val > max_val:
                    min_val, max_val = max_val, min_val
                self.memory[self.pointer] = random.randint(min_val, max_val)
            else:
                print("Warning: Invalid chase syntax. Use 'chase' or 'chase <min> <max>'", file=sys.stderr)
        elif command == 'mew':
            try:
                user_input = input('mew? ')
                self.memory[self.pointer] = int(user_input)
            except Exception:
                print("Warning: Invalid input for 'mew', setting memory to 0", file=sys.stderr)
                self.memory[self.pointer] = 0
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
        elif command == 'knead':
            # Add current and next cell, store in current
            if self.pointer + 1 < len(self.memory):
                try:
                    self.memory[self.pointer] += self.memory[self.pointer + 1]
                except Exception as e:
                    print(f"Error in knead: {e}", file=sys.stderr)
            else:
                print("Error: knead requires a next cell", file=sys.stderr)
        elif command == 'scratchout':
            # Subtract next cell from current, store in current
            if self.pointer + 1 < len(self.memory):
                try:
                    self.memory[self.pointer] -= self.memory[self.pointer + 1]
                except Exception as e:
                    print(f"Error in scratchout: {e}", file=sys.stderr)
            else:
                print("Error: scratchout requires a next cell", file=sys.stderr)
        elif command == 'pounceon':
            # Multiply current and next cell, store in current
            if self.pointer + 1 < len(self.memory):
                try:
                    self.memory[self.pointer] *= self.memory[self.pointer + 1]
                except Exception as e:
                    print(f"Error in pounceon: {e}", file=sys.stderr)
            else:
                print("Error: pounceon requires a next cell", file=sys.stderr)
        elif command == 'hairball':
            # Integer divide current by next cell, store in current
            if self.pointer + 1 < len(self.memory):
                divisor = self.memory[self.pointer + 1]
                try:
                    if divisor != 0:
                        self.memory[self.pointer] //= divisor
                    else:
                        print("Error: hairball division by zero", file=sys.stderr)
                        self.memory[self.pointer] = 0
                except Exception as e:
                    print(f"Error in hairball: {e}", file=sys.stderr)
            else:
                # fallback to old behavior: halve
                try:
                    self.memory[self.pointer] //= 2
                except Exception as e:
                    print(f"Error in hairball (halve): {e}", file=sys.stderr)
        elif command == 'pawprint':
            # Modulo current by next cell, store in current
            if self.pointer + 1 < len(self.memory):
                mod = self.memory[self.pointer + 1]
                try:
                    if mod != 0:
                        self.memory[self.pointer] %= mod
                    else:
                        print("Error: pawprint by zero is not allowed", file=sys.stderr)
                        self.memory[self.pointer] = 0
                except Exception as e:
                    print(f"Error in pawprint: {e}", file=sys.stderr)
            else:
                print("Error: pawprint requires a next cell", file=sys.stderr)
        elif command == 'catnip':
            # Power: current cell to the power of next cell
            if self.pointer + 1 < len(self.memory):
                try:
                    self.memory[self.pointer] = self.memory[self.pointer] ** self.memory[self.pointer + 1]
                except Exception as e:
                    print(f"Error in catnip: {e}", file=sys.stderr)
            else:
                print("Error: catnip requires a next cell", file=sys.stderr)
        elif command.startswith('pawprint'):
            parts = command.split()
            if len(parts) == 2 and parts[1].lstrip('-').isdigit():
                n = int(parts[1])
                if n != 0:
                    self.memory[self.pointer] %= n
                else:
                    print("Error: pawprint by zero is not allowed", file=sys.stderr)
                    self.memory[self.pointer] = 0
            else:
                print("Warning: Invalid pawprint syntax. Use 'pawprint <number>'", file=sys.stderr)
        elif command == 'hissfit':
            # Negate the current cell
            self.memory[self.pointer] = -self.memory[self.pointer]
        elif command == 'puffup':
            # Increment the next cell
            if self.pointer + 1 < len(self.memory):
                self.memory[self.pointer + 1] += 1
            else:
                self.memory.append(1)
        elif command == 'shrinktail':
            # Decrement the next cell
            if self.pointer + 1 < len(self.memory):
                self.memory[self.pointer + 1] -= 1
            else:
                self.memory.append(-1)
        elif command == 'scaredycat':
            # Set the next cell to 0
            if self.pointer + 1 < len(self.memory):
                self.memory[self.pointer + 1] = 0
            else:
                self.memory.append(0)
        else:
            # Unknown command - ignore
            pass
        
        self.program_counter += 1
    
    def run(self, source_code: str) -> str:
        """Run a .meow program and return the output"""
        self.reset()
        self.commands = self.parse_program(source_code)
        
        while self.program_counter < len(self.commands):
            command = self.commands[self.program_counter]
            self.execute_command(command)
        
        return '\n'.join(self.output)
    
    def run_file(self, filename: str) -> str:
        """Run a .meow file and return the output"""
        try:
            with open(filename, 'r') as f:
                source_code = f.read()
            return self.run(source_code)
        except FileNotFoundError:
            print(f"Error: File '{filename}' not found", file=sys.stderr)
            return ""
        except Exception as e:
            print(f"Error reading file '{filename}': {e}", file=sys.stderr)
            return ""

def main():
    """Main entry point for the command-line interface"""
    if len(sys.argv) < 2:
        print("Usage: meow <filename.meow>")
        print("Or: meow -c '<code>'")
        sys.exit(1)
    
    interpreter = MeowInterpreter()
    
    if sys.argv[1] == '-c' and len(sys.argv) >= 3:
        # Execute code from command line
        code = sys.argv[2]
        result = interpreter.run(code)
        if result:
            print(result)
    else:
        # Execute file
        filename = sys.argv[1]
        result = interpreter.run_file(filename)
        if result:
            print(result)

if __name__ == "__main__":
    main()