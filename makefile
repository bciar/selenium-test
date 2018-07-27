.PHONY: test test-regexp

test-regexp:
	node regexp/test/test.js
test: test-regexp
