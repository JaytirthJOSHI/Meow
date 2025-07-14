# MeowLang Demo 🐾

A beautiful, interactive web demo for MeowLang - the feline-friendly esoteric programming language!

## Features

- ✨ **Live Code Editor** - Write and run MeowLang code in real-time
- 🎨 **Modern UI** - Beautiful, responsive design with gradient backgrounds
- 📚 **Built-in Examples** - Load and run example programs from the dropdown
- 🧠 **Memory Visualization** - See the current memory state and pointer position
- ⌨️ **Keyboard Shortcuts** - Use Ctrl+Enter to run code quickly
- 📱 **Mobile Friendly** - Works great on all devices
- 🌐 **Web-Based** - Runs entirely in your browser - no server required!

## Quick Start

### Option 1: Simple (Recommended)

Just open `index.html` in your web browser! No installation or setup required.

### Option 2: Using a Local Server

For the best experience, serve the files with a simple HTTP server:

```bash
# Using Python's built-in server
python -m http.server 8000

# Then open http://localhost:8000 in your browser
```

## How to Use

1. **Write Code**: Type MeowLang commands in the code editor
2. **Run Code**: Click "🐱 Run Code" or press Ctrl+Enter
3. **See Results**: View output and memory state in the right panel
4. **Try Examples**: Use the dropdown to load example programs

## Example Programs

### Hello World
```
meow meow meow  🐾 Add 3 to current cell
purr            🐾 Output current cell value
hiss            🐾 Subtract 1 from current cell
purr            🐾 Output current cell value
scratch         🐾 Set current cell to 0
purr            🐾 Output current cell value
```

### Simple Loop
```
meow meow meow meow meow  🐾 Set initial value to 5
yowl            🐾 Start loop (while current cell != 0)
  purr          🐾 Output current value
  hiss          🐾 Decrement by 1
paw             🐾 End loop
```

### Fibonacci Sequence
```
meow meow meow meow meow  🐾 Set first number to 5
right            🐾 Move to second cell
meow meow meow meow meow meow meow meow  🐾 Set second number to 8
left             🐾 Move back to first cell
yowl            🐾 Start loop
  purr          🐾 Output first number
  knead         🐾 Add second cell to first
  right         🐾 Move to second cell
  purr          🐾 Output second number
  scratchout    🐾 Subtract first from second
  left          🐾 Move back to first cell
paw             🐾 End loop
```

## MeowLang Commands

| Command | Description |
|---------|-------------|
| `meow` | Increment current memory cell |
| `hiss` | Decrement current memory cell |
| `purr` | Output current cell value |
| `left` | Move memory pointer left |
| `right` | Move memory pointer right |
| `yowl` | Start loop (while current cell != 0) |
| `paw` | End loop |
| `scratch` | Set current cell to 0 |
| `lick` | Multiply current cell by 2 |
| `chase` | Generate random number |
| `mew` | Get user input (prompt) |
| `sleep` | Sleep for memory value milliseconds |
| `knead` | Add current and next cell |
| `scratchout` | Subtract next cell from current |
| `pounceon` | Multiply current and next cell |
| `hairball` | Integer divide current by next cell |
| `pawprint` | Modulo current by next cell |
| `catnip` | Power: current cell to the power of next cell |

## Architecture

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Interpreter**: Pure JavaScript implementation
- **Styling**: Custom CSS with gradients and animations
- **No Backend Required**: Everything runs in the browser!

## Files

- `index.html` - Main demo page
- `web_interpreter.js` - Pure JavaScript MeowLang interpreter
- `script.js` - Frontend logic and UI interactions
- `README.md` - This documentation

## Development

To modify the demo:

1. **Frontend**: Edit `index.html` and `script.js`
2. **Interpreter**: Edit `web_interpreter.js` to add new commands
3. **Styling**: Modify the CSS in `index.html`

## Troubleshooting

- **Code not running**: Check the browser console for JavaScript errors
- **Examples not loading**: Make sure all files are in the same directory
- **Display issues**: Try refreshing the page or clearing browser cache

## Browser Compatibility

This demo works in all modern browsers:
- Chrome/Chromium
- Firefox
- Safari
- Edge

## License

This demo is part of the MeowLang project. See the main LICENSE file for details. 