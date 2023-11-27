import {act, fireEvent, render, screen} from "@testing-library/react";
import ParamTextField from "./ParamTextField";
import userEvent from "@testing-library/user-event";

describe('ParamTextInfo', () => {

    it('should render', () => {
        render(
            <ParamTextField index={0} label={""} handleOnChange={jest.fn()}/>
        )

        expect(screen.getByTestId("param-text-field-test-id")).toBeInTheDocument();
    })

    it('should invoke onChange', () => {

        const onChangeMock = jest.fn();
        render(
            <ParamTextField index={0} label={""} handleOnChange={onChangeMock}/>
        )

        const paramTextField = screen.getByTestId("param-text-field-test-id");
        fireEvent.change(paramTextField, {target: {value: 'foo'}});

        expect(paramTextField).toBeInTheDocument();
        expect(onChangeMock).toHaveBeenCalledTimes(1);

    })
})