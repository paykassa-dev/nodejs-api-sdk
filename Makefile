run_linter:
	npm run lint
run_format:
	npm run format
build_readme:
	docker run --platform linux/amd64 -it --rm --name my-running-script -v "${PWD}":/usr/src/myapp -w /usr/src/myapp php:7.2-cli php ./scripts/compile_readme.php