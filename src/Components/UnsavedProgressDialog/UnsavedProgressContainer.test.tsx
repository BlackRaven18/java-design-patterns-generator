import UnsavedProgressContainer from "./UnsavedProgressContainter";
import {fireEvent, render, screen} from "@testing-library/react";

describe('UnsavedProgressContainer', () => {

    it('should render', () => {

        render(
            <UnsavedProgressContainer
                open={true}
                setOpen={jest.fn()}
                handleYes={jest.fn()}
            />
        );

        expect(screen.getByTestId('unsaved-progress-container-test-id')).toBeInTheDocument();
    })

    it('should close dialog', () => {

        render(
            <UnsavedProgressContainer
                open={true}
                setOpen={jest.fn()}
                handleYes={jest.fn()}
            />
        );

        expect(screen.getByTestId('unsaved-progress-container-test-id')).toBeInTheDocument();
        expect(screen.getByTestId('unsaved-progress-dialog-test-id')).toBeInTheDocument()

        fireEvent.click(screen.getByTestId('unsaved-progress-dialog-button-no-test-id'));


    })


})