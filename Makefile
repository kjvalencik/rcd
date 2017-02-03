BUILD = ./gh-pages
BIN = ./node_modules/.bin

BROWSERIFY = $(BIN)/browserify
WATCHIFY = $(BIN)/watchify
LESSC = $(BIN)/lessc
NODEMON = $(BIN)/nodemon
LIVERELOAD = $(BIN)/livereload

JS_FILES = $(shell find src/ -type f -name '*.js' -o -name '*.jsx')
LESS_FILES = $(shell find src/ -type f -name '*.less')

.PHONY: all
all: install build

.PHONY: build
build: html js css

install: node_modules
node_modules: package.json
	@npm install || rm -rf node_modules

.PHONY: lint
lint:
	@eslint --ext=".js,.jsx" src test

.PHONY: unit
unit:
	@nyc --reporter=lcov --reporter=text-summary ava test/*.test.js
	@nyc check-coverage --lines 100 --functions 100 --branches 100

.PHONY: test
test: lint unit

mkdir: $(BUILD)
$(BUILD):
	@mkdir -p $(BUILD)

html: mkdir $(BUILD)/index.html
$(BUILD)/index.html: src/index.html
	@perl -pe \
		'BEGIN{undef $$/;} s/\s*<!--\s*DEVELOPMENT: Start.*?DEVELOPMENT: End -->//sg' \
		src/index.html > $(BUILD)/index.html

js: mkdir $(BUILD)/scripts.js
$(BUILD)/scripts.js: $(JS_FILES)
	@NODE_ENV=production $(BROWSERIFY) src/js/index.jsx \
			-t babelify -g envify -g uglifyify \
			--extension=".jsx" --extension=".js" \
			> $(BUILD)/scripts.js || \
		rm $(BUILD)/scripts.js

css: mkdir $(BUILD)/styles.css
$(BUILD)/styles.css: $(LESS_FILES)
	@# Echo string so that file gets written all at once to prevent
	@# double reload.
	@echo "$$($(LESSC) src/css/index.less)" > $(BUILD)/styles.css

.PHONY: server
server:
	@$(NODEMON) -r babel-core/register -w dev dev/server.js

.PHONY: watch_js
watch_js: mkdir
	@$(WATCHIFY) -v -t babelify -g envify -p livereactload \
			--extension=".jsx" --extension=".js" \
			-o $(BUILD)/scripts.js \
		src/js/index.jsx


.PHONY: watch_css
watch_css: mkdir
	@$(NODEMON) -e less -x make css

.PHONY: livereload
livereload:
	@$(LIVERELOAD) $(BUILD) -x ".js"

.PHONY: dev
dev:
	@make -j 4 livereload server watch_js watch_css

.PHONY: clean
clean:
	@rm -rf $(BUILD)/*
