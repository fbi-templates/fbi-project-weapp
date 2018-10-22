# fbi-project-weapp

> A weapp project template, base on 'mpvue' and 'weui-wxss' UI framework.

> This is a fbi project template. If you haven't installed
> [fbi](https://github.com/AlloyTeam/fbi) yet, use the following command to
> install.
>
> `$ npm i -g fbi` or `yarn global add fbi`

## Requirements

* `fbi v3.0+`
* `node v7.6+`

## Usage

**Add template**

```bash
$ fbi add https://github.com/fbi-templates/fbi-project-weapp.git
```

**Create a project**

```bash
$ cd path/to/empty-folder
$ fbi init -o weapp

# or
$ fbi init -o weapp my-app
```

**Show available tasks**

```bash
$ fbi ls
```

**Run a task**

```bash
# start development server
$ fbi s

# build for production
$ fbi b
```

**Update template**

```bash
$ fbi up weapp
```

## Tasks

### `serve`

* Description: Compile and start development server.
* Params:
  * `port` `{Number}` Server starting port. If occupied, switch automatically.
* Alias: `s`
* Examples:
  * `fbi s`
  * `fbi s -port=9999`

### `build`

* Description: Build the project for the specified environment.
* Alias: `b`
* Examples:
  * `fbi b`

## More

* [Official templates](https://github.com/fbi-templates)
* [`fbi` documentation](https://neikvon.gitbooks.io/fbi/content/)

## License

[MIT](https://opensource.org/licenses/MIT)

## [Changelog](./CHANGELOG.md)
