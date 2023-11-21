import {Provider} from "react-redux";
import {store} from "../redux/store";
import EditorPanel from "./EditorPanel";
import {fireEvent, render, screen} from "@testing-library/react";

describe('EditorPanel', () => {

    it('should render', () => {
        render(
            <Provider store={store}>
                <EditorPanel setEditorParentRef={jest.fn()}/>
            </Provider>
        )

        fireEvent.click(screen.getByTestId("editor-panel-tab-test-id"));
        expect(screen.getByTestId("editor-panel-test-id")).toBeInTheDocument();

    })
})