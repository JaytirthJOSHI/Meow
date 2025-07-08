# Makefile for .meow language project

.PHONY: help test run-examples clean install format lint

help:
	@echo ".meow Language Makefile"
	@echo ""
	@echo "Available commands:"
	@echo "  test          - Run all tests"
	@echo "  run-examples  - Run all example programs"
	@echo "  clean         - Clean up generated files"
	@echo "  install       - Install the package"
	@echo "  format        - Format code with black"
	@echo "  lint          - Run linting with flake8"
	@echo "  demo          - Run a quick demo"

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

all: format lint test run-examples