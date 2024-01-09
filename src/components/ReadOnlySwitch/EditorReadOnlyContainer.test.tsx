import {store} from "../../redux/store";
import {Provider} from "react-redux";
import EditorReadOnlyContainer from "./EditorReadOnlyContainer";
import {cleanup, fireEvent, render, screen, waitFor} from "@testing-library/react";

describe('EditorReadOnlyContainer', () => {

    afterEach(() => {
        cleanup();
        jest.resetModules();
        jest.resetAllMocks();

    })

    function renderComponent() {
        return render(
            <Provider store={store}>
                <EditorReadOnlyContainer
                ></EditorReadOnlyContainer>
            </Provider>
        );
    }


    it('should render', () => {
        const renderedComponent = renderComponent();

        const element = screen.getByTestId("editor-read-only-container-test-id");

        expect(element).toBeInTheDocument();
    })

    it("should open dialog on handleEditorReadOnlyChange", () => {

        const renderedComponent = renderComponent();

        fireEvent.click(screen.getByTestId("editor-read-only-switch-test-id"));

        const dialog = screen.getByTestId("editor-read-only-dialog-test-id");

        expect(dialog).toBeInTheDocument();

    })


    it("should close dialog on handleEditorClose", () => {

        const renderedComponent = renderComponent();

        fireEvent.click(screen.getByTestId("editor-read-only-switch-test-id"));
        fireEvent.click(screen.getByTestId("editor-read-only-dialog-button-yes-test-id"))
        fireEvent.click(screen.getByTestId("editor-read-only-dialog-button-no-test-id"))


    })

    // it("should close dialog on handleNo()", () => {
    //
    //
    //
    //     const renderedComponent = renderComponent();
    //
    //     fireEvent.click(screen.getByTestId("editor-read-only-switch-test-id"));
    //     fireEvent.click(screen.getByTestId("editor-read-only-dialog-button-no-test-id"))
    //
    //
    // })
})