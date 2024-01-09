import EditorReadOnlySwitch from "./EditorReadOnlySwitch";
import {render, screen} from "@testing-library/react";
import mock = jest.mock;

describe("EditorReadOnlySwitch", () => {

    it('should render', () => {
        const renderedSwitch = render(
            <EditorReadOnlySwitch
                isEditorReadOnly={true}
                handleEditorReadOnlyChange={jest.fn()}
            />
        )

        expect(screen.getByTestId("editor-read-only-switch-test-id")).toBeInTheDocument()
    })

    it('should render disabled switch', () => {
        const renderedSwitch = render(
            <EditorReadOnlySwitch
                isEditorReadOnly={false}
                handleEditorReadOnlyChange={jest.fn()}
            />
        )
    })
})