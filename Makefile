MOCHA=mocha
DESTDIR=build
COVDIR=$(DESTDIR)-cov
NAME=tp

test: build
	$(MOCHA)

test-client: build
	mocha-phantomjs -R dot test/client.html
	mocha-phantomjs -R dot test/client-min.html

test-cov: build
	@rm -rf $(COVDIR)
	jscoverage $(DESTDIR) $(COVDIR)
	TP_COV=1 $(MOCHA) -R html-cov > coverage.html
	rm -rf $(COVDIR)

test-all: test test-client test-cov

build: src/$(NAME).js
	mkdir -p $(DESTDIR)
	cp src/$(NAME).js $(DESTDIR)/$(NAME).js
	uglifyjs src/$(NAME).js > $(DESTDIR)/$(NAME).min.js

release: build
	cp $(DESTDIR)/$(NAME).min.js ./

clear:
	rm -rf $(DESTDIR)
	rm -rf $(COVDIR)

.PHONY: build test
