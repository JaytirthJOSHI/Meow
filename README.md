# MeowLang 🐱

A feline-friendly esoteric programming language where every command sounds like a cat! Perfect for learning programming concepts in a fun, approachable way.

## Features

- **🐱 Cat-themed commands**: Every instruction sounds like a cat sound or behavior
- **📚 Educational**: Great for learning programming concepts like loops, memory management, and algorithms
- **🎮 Interactive**: Try it online in the web playground
- **🔧 Easy to install**: Simple pip installation
- **📖 Well documented**: Comprehensive documentation and examples

## Quick Start

### Installation

```bash
pip install meowlang
```

### Command Line Usage

```bash
# Run a .meow file
meow hello.meow

# Execute code directly
meow -c "meow meow meow purr"
```

### Python API

```python
from meowlang import MeowInterpreter

interpreter = MeowInterpreter()
result = interpreter.run('meow meow meow purr')
print(result)  # Output: 3
```

## Core Commands

| Command | Description | Brainfuck Equivalent |
|---------|-------------|---------------------|
| `meow` | Increment current cell | `+` |
| `hiss` | Decrement current cell | `-` |
| `purr` | Output current cell | `.` |
| `mew` | Input to current cell | `,` |
| `left` | Move pointer left | `<` |
| `right` | Move pointer right | `>` |
| `yowl` | Start loop | `[` |
| `paw` | End loop | `]` |
| `nap` | No operation | N/A |
| `🐾` | Comment | N/A |

## Advanced Commands

| Command | Description |
|---------|-------------|
| `scratch` | Set current cell to 0 |
| `lick` | Multiply current cell by 2 |
| `stretch` | Set current cell to absolute value |
| `zoomies` | Square the current cell |
| `groom` | Sort memory array |
| `sleep` | Sleep for memory value milliseconds |
| `chase` | Generate random number (0-9) |
| `chase <min> <max>` | Generate random number in range |
| `pounce <line>` | Jump to line number |
| `knead` | Add current and next cell |
| `scratchout` | Subtract next from current cell |
| `pounceon` | Multiply current and next cell |
| `hairball` | Integer divide current by next cell |
| `pawprint` | Modulo current by next cell |
| `catnip` | Power: current to the power of next |
| `hissfit` | Negate current cell |
| `puffup` | Increment next cell |
| `shrinktail` | Decrement next cell |
| `scaredycat` | Set next cell to 0 |

## Examples

### Hello World (Output "Hello")

```meow
🐾 Hello World in MeowLang
meow meow meow meow meow meow meow meow meow meow 🐾 Set cell 0 to 10
yowl 🐾 Start loop
    meow meow meow meow meow meow meow meow meow meow 🐾 Add 10 to cell 0
    right 🐾 Move to cell 1
    meow meow meow meow meow meow meow meow meow meow 🐾 Set cell 1 to 10
    left 🐾 Back to cell 0
    hiss 🐾 Decrement cell 0
paw 🐾 End loop
right 🐾 Move to cell 1
purr 🐾 Output cell 1 (should be 10)
```

### Simple Calculator

```meow
🐾 Add two numbers
mew 🐾 Get first number
right 🐾 Move to next cell
mew 🐾 Get second number
left 🐾 Back to first cell
knead 🐾 Add cells together
left 🐾 Move to result cell
purr 🐾 Output result
```

### Fibonacci Sequence

```meow
🐾 Generate Fibonacci numbers
meow meow meow meow meow meow meow meow meow meow 🐾 Set counter to 10
yowl 🐾 Start loop
    right 🐾 Move to next cell
    meow meow meow meow meow meow meow meow meow meow 🐾 Set to 10
    right 🐾 Move to next cell
    meow meow meow meow meow meow meow meow meow meow 🐾 Set to 10
    left left 🐾 Back to counter
    hiss 🐾 Decrement counter
paw 🐾 End loop
right 🐾 Move to first number
purr 🐾 Output first number
right 🐾 Move to second number
purr 🐾 Output second number
```

## Web Demo

Try MeowLang online at the [web playground](https://meowlang.jaytirthjoshi.com)!

## Development

### Installation for Development

```bash
git clone https://github.com/jaytirthjoshi/meow.git
cd meow
pip install -e .
pip install -e ".[dev,web]"
```

### Running Tests

```bash
pytest
```

### Running the Web Demo

```bash
cd demo
python app.py
```

Then visit `http://localhost:5000`

## Project Structure

```
meow/
├── meowlang/           # Main package
│   ├── __init__.py
│   └── interpreter.py  # Core interpreter
├── demo/               # Web demo
│   ├── app.py         # Flask server
│   ├── templates/     # HTML templates
│   └── static/        # CSS/JS assets
├── examples/          # Example programs
├── tests/            # Test files
└── setup.py          # Package configuration
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by Brainfuck and other esoteric programming languages
- Built with ❤️ and lots of cat puns
- Special thanks to all the cats who provided inspiration

---

**🐱 MeowLang - Where programming meets purrfection! 🐱**