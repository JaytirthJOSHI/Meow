# .meow — The Feline-Friendly Esoteric Programming Language

[![Python](https://img.shields.io/badge/Python-3.7+-blue.svg)](https://python.org)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> Because programming should be fun, cats are chaotic, and you deserve to write code that goes meow!

## What is MeowLang?

MeowLang (.meow) is a whimsical esoteric programming language where every line of code sounds like a cat. Inspired by the chaos of esolangs and the elegance of felines, .meow lets you vibe code using cat noises.

## Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/jaytirthjoshi/meow.git
cd meow

# Run a .meow program
python meow_interpreter.py examples/hello_world.meow
```

### Your First .meow Program

Create a file called `hello.meow`:

```meow
🐾 Hello World in .meow 🐾
meow
meow
meow
purr
hiss
purr
scratch
purr
```

Run it:
```bash
python meow_interpreter.py hello.meow
```

Output:
```
3
2
0
```

## Commands Reference

| Command | Action | Example |
|---------|--------|---------|
| `meow` | Increment memory value by 1 | `meow` → memory += 1 |
| `hiss` | Decrement memory value by 1 | `hiss` → memory -= 1 |
| `purr` | Print the current memory value | `purr` → prints memory |
| `meowt "text"` | Print custom text output | `meowt "Hello!"` → prints Hello! |
| `nap` | Do nothing (no-op) | `nap` → does nothing |
| `scratch` | Reset memory value to 0 | `scratch` → memory = 0 |
| `lick` | Double the current memory value | `lick` → memory *= 2 |
| `zoomies` | Square the memory value | `zoomies` → memory = memory² |
| `yowl` | Begin a loop (while memory != 0) | `yowl` → loop start |
| `paw` | End a loop | `paw` → loop end |
| `sleep` | Sleep for memory value milliseconds | `sleep` → pause execution |
| `🐾` | Comment/decoration (ignored) | `🐾 comment 🐾` |
| `mew` | Take user input and set memory to that value | `mew` → memory = user input |
| `pounce <line_number>` | Jump to the specified line number (1-based) | `pounce 5` |
| `knead` | Add current and next cell, store in current | `knead` → memory[pointer] += memory[pointer+1] |
| `scratchout` | Subtract next cell from current, store in current | `scratchout` → memory[pointer] -= memory[pointer+1] |
| `pounceon` | Multiply current and next cell, store in current | `pounceon` → memory[pointer] *= memory[pointer+1] |
| `hairball` | Integer divide current by next cell, store in current | `hairball` → memory[pointer] //= memory[pointer+1] |
| `pawprint` | Modulo current by next cell, store in current | `pawprint` → memory[pointer] %= memory[pointer+1] |
| `catnip` | Raise current to power of next cell, store in current | `catnip` → memory[pointer] **= memory[pointer+1] |
| `snuggle` | Copy value from next cell to current cell | `snuggle` → memory[pointer] = memory[pointer+1] |
| `mewmew` | Take user input and store in next cell | `mewmew` → memory[pointer+1] = user input |

## File Extension

All MeowLang programs are saved as `.meow` files:
- `hello_world.meow`
- `fibonacci.meow`
- `countdown.meow`

## Examples

### Countdown Program

```meow
🐾 Countdown from 5 to 1 🐾
meow
meow
meow
meow
meow
yowl
purr
hiss
paw
```

**Output:**
```
5
4
3
2
1
```

### Mathematical Operations

```meow
🐾 Powers and multiplication demo 🐾
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
```

**Output:**
```
2
4
8
16
256
```

### Fibonacci Sequence

```meow
🐾 First 8 Fibonacci numbers 🐾
meow
purr
purr
meow
meow
purr
meow
meow
meow
purr
🐾 ... (see examples/fibonacci.meow for full program) 🐾
```

**Output:**
```
1
1
2
3
5
8
13
21
```

### Stretch Command

```meow
🐾 Demonstrate the 'stretch' command 🐾
meow
meow
meow
hiss
hiss
hiss
hiss
purr
stretch
purr
🐾 The first purr should print -1, the second should print 1 🐾
```

**Output:**
```
-1
1
```

### Groom Command (Sort Memory)

```meow
🐾 Demonstrate the 'groom' command (sort memory) 🐾
meow
meow
right
meow
meow
meow
right
meow
hiss
hiss
purr 🐾 Should print -1 (third cell)
groom
left
left
purr 🐾 Should print 2 (first cell, after sort)
right
purr 🐾 Should print 3 (second cell, after sort)
right
purr 🐾 Should print -1 (third cell, after sort)
```

**Output:**
```
-1
2
3
-1
```

### Puffup and Shrinktail (Tape Expansion/Contraction)

```meow
🐾 Demonstrate 'puffup' and 'shrinktail' commands 🐾
meow
meow
purr 🐾 Should print 2 (cell 0)
puffup 2
right
meow
purr 🐾 Should print 1 (cell 1)
right
meow
meow
purr 🐾 Should print 2 (cell 2)
shrinktail 1
right
purr 🐾 Should print 0 (cell 2 was removed, pointer now at last cell)
```

**Output:**
```
2
1
2
0
```

### Custom Text Output

```meow
meowt "Hello, world!"
purr
meowt "Done!"
```

**Output:**
```
Hello, world!
0
Done!
```

### Calculator Example

```meow
🐾 Simple calculator: (3 + 4) * 2 🐾
meow
meow
meow      🐾 cell 0 = 3
right
meow
meow
meow
meow      🐾 cell 1 = 4
left
knead     🐾 cell 0 = 3 + 4 = 7
right
meow
meow      🐾 cell 1 = 2
left
pounceon  🐾 cell 0 = 7 * 2 = 14
purr      🐾 prints 14
```

### More Examples

See `examples/calculator.meow` for a full calculator program using the cat-themed calculator commands (`knead`, `scratchout`, `pounceon`, `hairball`, `pawprint`, `catnip`).

## Usage

### Command Line Interface

```
```