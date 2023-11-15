import {render} from "@testing-library/react";
import EditorReadOnlyDialog from "./EditorReadOnlyDialog";

describe('EditorReadOnlyDialog', () => {

    it('should render open dialog', () => {
        render(
            <EditorReadOnlyDialog
                open={true}
                handleClose={jest.fn()}
                handleYes={jest.fn()}
                handleNo={jest.fn()}

            ></EditorReadOnlyDialog>
        );
    })
})