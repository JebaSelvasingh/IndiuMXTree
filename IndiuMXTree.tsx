import { Component, ReactNode, createElement } from "react";
import CheckboxTree from "react-checkbox-tree";
import { IndiuMXTreeContainerProps } from "./typings/IndiuMXTreeProps";
import "./ui/IndiuMXTree.css";

export class IndiuMXTree extends Component<IndiuMXTreeContainerProps> {
    public child1: any = [];
    public child2: any = [];
    public child3: any = [];
    public child4: any = [];
    public child5: any = [];
    public checked: any = "";
    public expanded: any;
    public items: any;
    state: any = {
        checked: [],
        expanded: []
    };

    public nodes: any = [];

    //  on load this function will be called
    componentDidMount() {
        if (this.props.InputValue?.value) {
            let inputData = JSON.parse(this.props.InputValue.value);
            for (var i = 0; i <= inputData.length; i++) {
                if (inputData[i]?.checked) {
                    this.state.checked.push(inputData[i].label);
                }
                if (inputData[i]?.children.length) {
                    for (var j = 0; j <= inputData[i]?.children.length; j++) {
                        if (inputData[i]?.children[j]?.checked) {
                            this.state.checked.push(inputData[i].children[j].label);
                        }
                    }
                }
            }
            console.log(this.state.checked);
            this.nodes = JSON.parse(this.props.InputValue.value);
        }
    }
    public check(checked: any) {
        console.log("Inside check flow");
        console.log(this.state.checked);
        this.setState({ checked });
        if (this.props.outputAttribute) {
            this.props.outputAttribute.setValue(checked.toString());
            if (this.props.onChangeReset && this.props.onChangeReset.canExecute) {
                this.props.onChangeReset.execute();
            }
        }
    }


 
    render(): ReactNode {
        this.componentDidMount();
        return (
            <div>
                <CheckboxTree
                    nodes={this.nodes}
                    checked={this.state.checked}
                    expanded={this.state.expanded}
                    onCheck={checked => this.check(checked)}
                    onExpand={expanded => this.setState({ expanded })}
                    showExpandAll={this.props.showExpandAll?.value}
                    optimisticToggle={true}
                    icons={{
                        check: <span className="rct-icon rct-icon-check" />,
                        uncheck: <span className="rct-icon rct-icon-uncheck" />,
                        halfCheck: <span className="rct-icon rct-icon-half-check" />,
                        expandClose: <span className="glyphicon glyphicon-triangle-right" />,
                        expandOpen: <span className="glyphicon glyphicon-triangle-bottom" />,
                        expandAll: <span className="rct-icon rct-icon-expand-all" />,
                        collapseAll: <span className="rct-icon rct-icon-collapse-all" />,
                        parentClose: <span className="rct-icon rct-icon-parent-close" />,
                        parentOpen: <span className="rct-icon rct-icon-parent-open" />,
                        leaf: <span className="rct-icon rct-icon-leaf" />
                    }}
                />
            </div>
        );
    }
}
