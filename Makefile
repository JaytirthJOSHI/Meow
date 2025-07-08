# Makefile for .meow language project

.PHONY: help test run-examples clean install format lint build publish style check-examples package-vscode all

help:
	@echo ".meow Language Makefile"
	@echo ""
	@echo "Available commands:"
	@echo "  test            - Run all tests"
	@echo "  run-examples    - Run all example programs"
	@echo "  check-examples  - Run all .meow files in examples/"
	@echo "  clean           - Clean up generated files"
	@echo "  install         - Install the package"
	@echo "  format          - Format code with black"
	@echo "  lint            - Run linting with flake8"
	@echo "  style           - Run isort, black, and flake8"
	@echo "  build           - Build the package for PyPI"
	@echo "  publish         - Publish the package to PyPI"
	@echo "  package-vscode  - Package the VSCode extension (zip)"
	@echo "  demo            - Run a quick demo"
	@echo "  all             - Run format, lint, test, and run-examples"

test:
	@echo "Running tests..."
	python -m pytest test_meow.py -v

run-examples:
	@echo "Running example programs..."
	@echo "=== Hello World ==="
	python meow_interpreter.py examples/hello_world.meow
	@echo ""
	@echo "=== Countdown ==="
	python meow_interpreter.py examples/countdown.meow
	@echo ""
	@echo "=== Powers ==="
	python meow_interpreter.py examples/powers.meow
	@echo ""
	@echo "=== Fibonacci ==="
	python meow_interpreter.py examples/fibonacci.meow

demo:
	@echo "Quick .meow demo:"
	python meow_interpreter.py -e "meow meow meow purr hiss purr scratch purr"

clean:
	@echo "Cleaning up..."
	find . -type f -name "*.pyc" -delete
	find . -type d -name "__pycache__" -delete
	find . -type d -name "*.egg-info" -exec rm -rf {} +

install:
	@echo "Installing .meow language..."
	pip install -e .

format:
	@echo "Formatting code..."
	black meow_interpreter.py test_meow.py

lint:
	@echo "Running linter..."
	flake8 meow_interpreter.py test_meow.py

check-examples:
	@echo "Running all .meow files in examples/..."
	@for f in examples/*.meow; do \
	  echo "=== Running $$f ==="; \
	  python meow_interpreter.py "$$f"; \
	  echo ""; \
	done

style:
	@echo "Checking code style..."
	isort meow_interpreter.py test_meow.py
	black meow_interpreter.py test_meow.py
	flake8 meow_interpreter.py test_meow.py

build:
	@echo "Building package..."
	python -m build

publish:
	@echo "Publishing to PyPI..."
	twine upload dist/*

package-vscode:
	@echo "Packaging VSCode extension..."
	cd vscode-meowlang && zip -r ../meowlang-vscode.zip .

all: format lint test run-examples