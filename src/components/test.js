import React, { Component } from 'react';
import './test.css';

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            check: []
        };
    }
    componentDidMount() { }

    render() {

        return (
            <div className="component-add container">
               <div className="row">
                <div className="col-sm-12">
                    <form className="form-horizontal" method="post" action="http://localhost:3001/admin/question/new">
                        <div className="form-group"> 
                            <label className="col-sm-2 control-label">科目类别</label>
                            <div className="col-sm-10">
                            <div className="radio-control">
                                <input className="" name="question[subject]" value="1" type="radio" defaultChecked />
                                <label className="">科目一</label>
                                <input className="" name="question[subject]" value="4" type="radio" />
                                <label className="">科目四</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group"> 
                            <label className="col-sm-2 control-label">题目</label>
                            <div className="col-sm-10">
                                <input className="form-control" name="question[title]" type="text" />
                            </div>
                        </div>
                        <div className="form-group"> 
                            <label className="col-sm-2 control-label">图片或视频地址</label>
                            <div className="col-sm-10">
                                <input className="form-control" name="question[flash]" type="text" />
                            </div>
                        </div>
                        <div className="form-group"> 
                            <label className="col-sm-2 control-label">选项A</label>
                            <div className="col-sm-10">
                                <input className="form-control" name="options[1]" type="text" />
                            </div>
                        </div>
                        <div className="form-group"> 
                            <label className="col-sm-2 control-label">选项B</label>
                            <div className="col-sm-10">
                                <input className="form-control" name="options[2]" type="text" />
                            </div>
                        </div>
                        <div className="form-group"> 
                            <label className="col-sm-2 control-label">选项C</label>
                            <div className="col-sm-10">
                                <input className="form-control" name="options[3]" type="text" />
                            </div>
                        </div>
                        <div className="form-group"> 
                            <label className="col-sm-2 control-label">选项D</label>
                            <div className="col-sm-10">
                                <input className="form-control" name="options[4]" type="text" />
                            </div>
                        </div>
                        <div className="form-group"> 
                            <label className="col-sm-2 control-label">答案</label>
                            <div className="col-sm-10">
                                <input className="form-control" name="question[check]" type="text" />
                            </div>
                        </div>
                        <div className="form-group"> 
                            <label className="col-sm-2 control-label">解析</label>
                            <div className="col-sm-10">
                                <input className="form-control" name="question[description]" type="text" />
                            </div>
                        </div>
                        <div className="form-group"> 
                            <div className="col-sm-offset-2 col-sm-10">
                                <button className="btn btn-default" type="submit">录入</button>
                            </div>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        )
    }
}



export default Test;