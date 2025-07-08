#!/usr/bin/env python3
"""
Test suite for the .meow language interpreter
"""

import unittest
import tempfile
import os
from meow_interpreter import MeowInterpreter

class TestMeowInterpreter(unittest.TestCase):
    
    def setUp(self):
        """Set up a fresh interpreter for each test"""
        self.interpreter = MeowInterpreter()
    
    def test_basic_commands(self):
        """Test basic commands: meow, hiss, purr, scratch"""
        code = """
        meow
        meow
        meow
        purr
        hiss
        purr
        scratch
        purr
        """
        result = self.interpreter.run(code)
        expected = "3\n2\n0"
        self.assertEqual(result, expected)
    
    def test_mathematical_commands(self):
        """Test lick and zoomies commands"""
        code = """
        meow
        meow
        purr
        lick
        purr
        zoomies
        purr
        """
        result = self.interpreter.run(code)
        expected = "2\n4\n16"
        self.assertEqual(result, expected)
    
    def test_loops(self):
        """Test yowl and paw loop commands"""
        code = """
        meow
        meow
        meow
        yowl
        purr
        hiss
        paw
        """
        result = self.interpreter.run(code)
        expected = "3\n2\n1"
        self.assertEqual(result, expected)
    
    def test_nested_loops(self):
        """Test nested loops"""
        code = """
        meow
        meow
        yowl
        purr
        meow
        yowl
        purr
        hiss
        paw
        hiss
        paw
        """
        result = self.interpreter.run(code)
        # This should output: 2, 3, 2, 1, 0
        self.assertIn("2", result)
        self.assertIn("3", result)
        self.assertIn("1", result)
        self.assertIn("0", result)
    
    def test_no_op(self):
        """Test nap command (no-op)"""
        code = """
        meow
        nap
        nap
        nap
        purr
        """
        result = self.interpreter.run(code)
        self.assertEqual(result, "1")
    
    def test_comments_and_emojis(self):
        """Test that comments and emojis are ignored"""
        code = """
        # This is a comment
        🐾 Decorative emoji 🐾
        meow
        meow
        🐱 Another emoji 😸
        purr
        """
        result = self.interpreter.run(code)
        self.assertEqual(result, "2")
    
    def test_empty_lines(self):
        """Test that empty lines are handled correctly"""
        code = """
        meow
        
        meow
        
        purr
        """
        result = self.interpreter.run(code)
        self.assertEqual(result, "2")
    
    def test_unknown_commands(self):
        """Test that unknown commands are ignored with warning"""
        code = """
        meow
        unknown_command
        purr
        """
        result = self.interpreter.run(code)
        self.assertEqual(result, "1")
    
    def test_negative_numbers(self):
        """Test negative numbers with hiss"""
        code = """
        hiss
        hiss
        hiss
        purr
        """
        result = self.interpreter.run(code)
        self.assertEqual(result, "-3")
    
    def test_large_numbers(self):
        """Test large numbers with lick and zoomies"""
        code = """
        meow
        meow
        lick
        lick
        lick
        lick
        lick
        zoomies
        purr
        """
        result = self.interpreter.run(code)
        # 2 * 2^5 = 64, then 64^2 = 4096
        self.assertEqual(result, "4096")
    
    def test_file_execution(self):
        """Test running from a file"""
        with tempfile.NamedTemporaryFile(mode='w', suffix='.meow', delete=False) as f:
            f.write("meow\nmeow\npurr\n")
            filename = f.name
        
        try:
            result = self.interpreter.run_file(filename)
            self.assertEqual(result, "2")
        finally:
            os.unlink(filename)
    
    def test_file_not_found(self):
        """Test handling of non-existent files"""
        result = self.interpreter.run_file("nonexistent.meow")
        self.assertEqual(result, "")
    
    def test_reset_functionality(self):
        """Test that reset works correctly"""
        code1 = "meow\nmeow\npurr"
        code2 = "meow\npurr"
        
        result1 = self.interpreter.run(code1)
        result2 = self.interpreter.run(code2)
        
        self.assertEqual(result1, "2")
        self.assertEqual(result2, "1")
    
    def test_countdown_example(self):
        """Test the countdown example"""
        code = """
        meow
        meow
        meow
        meow
        meow
        yowl
        purr
        hiss
        paw
        """
        result = self.interpreter.run(code)
        expected = "5\n4\n3\n2\n1"
        self.assertEqual(result, expected)
    
    def test_powers_example(self):
        """Test the powers example"""
        code = """
        meow
        meow
        purr
        lick
        purr
        lick
        purr
        lick
        purr
        zoomies
        purr
        """
        result = self.interpreter.run(code)
        expected = "2\n4\n8\n16\n256"
        self.assertEqual(result, expected)

    def test_mew_command(self):
        """Test the mew command (user input)"""
        import builtins
        original_input = builtins.input
        builtins.input = lambda prompt='': '42'
        try:
            code = """
mew
purr
"""
            result = self.interpreter.run(code)
            self.assertEqual(result, "42")
        finally:
            builtins.input = original_input

    def test_pounce_command(self):
        """Test the pounce command (goto line)"""
        code = """
meow
meow
pounce 5
hiss
purr
"""
        result = self.interpreter.run(code)
        self.assertEqual(result, "2")  # Should skip hiss and print 2

        # Test invalid pounce
        code = """
meow
pounce 100
purr
"""
        result = self.interpreter.run(code)
        self.assertEqual(result, "1")

    def test_calculator_commands(self):
        """Test cat-themed calculator commands"""
        code = """
meow
meow
meow      # cell 0 = 3
right
meow
meow
meow
meow      # cell 1 = 4
left
knead     # cell 0 = 7
purr
right
meow
meow      # cell 1 = 2
left
pounceon  # cell 0 = 14
purr
right
scratchout # cell 1 = 2 - 14 = -12
purr
left
hairball  # cell 0 = 14 // -12 = -2
purr
right
meow      # cell 1 = -11
left
pawprint  # cell 0 = -2 % -11 = -2
purr
right
meow      # cell 1 = 3
left
catnip    # cell 0 = (-2) ** 3 = -8
purr
"""
        result = self.interpreter.run(code)
        expected = "7\n14\n-12\n-2\n-2\n-8"
        self.assertEqual(result, expected)

if __name__ == '__main__':
    unittest.main()