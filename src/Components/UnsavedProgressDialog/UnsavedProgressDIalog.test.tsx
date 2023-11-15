import UnsavedProgressDialog from "./UnsavedProgressDialog";
import {render, screen} from "@testing-library/react";

describe('UnsavedProgressDialog', () => {

    it('should render', () => {

        render(
            <UnsavedProgressDialog
                open={true}
                handleClose={jest.fn()}
                handleYes={jest.fn()}
                handleNo={jest.fn()}/>
        )

        const dialog = screen.getByTestId('unsaved-progress-dialog-test-id');

        expect(dialog).toBeInTheDocument();
    })

})