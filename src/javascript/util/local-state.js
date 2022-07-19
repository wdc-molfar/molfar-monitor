const { extend } = require("lodash")
const path = require("path")
const fs = require("fs")
const fse = require("fs-extra")


const State = class {
	constructor (options){
		this.path = path.resolve(options.filename)
		this.beforeSave = options.beforeSave || (data => data)
		
		if(fse.pathExistsSync(this.path)){
			this.restore()
		} else {
			fse.mkdirsSync(path.dirname(this.path))
			this.data = options.initialState
			this.save()
		}

	}

	save(){
		let data = this.beforeSave(this.data)
		fs.writeFileSync(this.path, JSON.stringify(data, null, " "))
	}

	restore(){
		this.data = JSON.parse(fs.readFileSync(this.path).toString())
	}

	get(){
		return this.data
	}
}

module.exports = {
	State
}	