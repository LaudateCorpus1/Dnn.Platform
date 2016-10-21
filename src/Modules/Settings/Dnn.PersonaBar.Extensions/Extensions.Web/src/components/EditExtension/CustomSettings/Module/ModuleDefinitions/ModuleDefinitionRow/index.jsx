import React, { PropTypes, Component } from "react";
import GridCell from "dnn-grid-cell";
import GridSystem from "dnn-grid-system";
import SingleLineInputWithError from "dnn-single-line-input-with-error";
import Collapse from "react-collapse";
import { EditIcon, TrashIcon } from "dnn-svg-icons";
import Controls from "./Controls";
import DefinitionFields from "../DefinitionFields";
import Button from "dnn-button";
import "./style.less";

const inputStyle = { width: "100%" };

class ModuleDefinitionRow extends Component {
    constructor() {
        super();
        this.state = {
            isOpened: false
        };
    }
    /* eslint-disable react/no-danger */
    render() {
        const {props, state} = this;
        return (
            <GridCell className="module-definition-row">
                <GridCell columnSize={85} className="module-definition-name">
                    {props.moduleDefinition.name}
                </GridCell>
                <GridCell columnSize={15} className="action-buttons">
                    <div onClick={props.onDelete.bind(this)} dangerouslySetInnerHTML={{ __html: TrashIcon }}></div>
                    <div onClick={props.onEdit.bind(this)} className={props.isEditMode ? "svg-active" : ""} dangerouslySetInnerHTML={{ __html: EditIcon }}></div>
                </GridCell>
                <Collapse isOpened={props.isEditMode} style={{ float: "left" }} className="edit-module-definition">

                    <GridCell className="edit-module-definition-box">
                        <DefinitionFields
                            error={props.error}
                            triedToSave={props.triedToSave}
                            onChange={props.onChange.bind(this)}
                            isEditMode={true}
                            moduleDefinitionBeingEdited={props.moduleDefinitionBeingEdited}
                            />
                        <GridCell className="module-controls">
                            <Controls
                                moduleControls={props.moduleDefinitionBeingEdited.controls}
                                onChange={props.onChange.bind(this, "controls")}
                                moduleDefinitionId={props.moduleDefinitionBeingEdited.id} />
                        </GridCell>
                        <GridCell columnSize={100} className="modal-footer">
                            <Button type="secondary" onClick={props.onCancel.bind(this)}>Cancel</Button>
                            <Button type="primary" disabled={props.controlFormIsDirty} onClick={props.onSave.bind(this)}>Save</Button>
                        </GridCell>
                    </GridCell>
                </Collapse>
            </GridCell>
        );
    }
}

ModuleDefinitionRow.PropTypes = {
    moduleDefinition: PropTypes.object,
    moduleDefinitionBeingEdited: PropTypes.object,
    onCancel: PropTypes.func,
    onSave: PropTypes.func,
    onChange: PropTypes.func,
    onEdit: PropTypes.func,
    error: PropTypes.object
};

export default ModuleDefinitionRow;