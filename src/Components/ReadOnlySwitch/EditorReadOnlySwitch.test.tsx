import EditorReadOnlySwitch from "./EditorReadOnlySwitch";
import {render} from "@testing-library/react";
import mock = jest.mock;

describe("EditorReadOnlySwitch", () => {

    it('should render', () => {
        const renderedSwitch = render(
            <EditorReadOnlySwitch
                isEditorReadOnly={true}
                handleEditorReadOnlyChange={jest.fn()}
            />
        )
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