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

        act(() => {

            userEvent.type(screen.getByRole('textbox'), "foo");
        })

        expect(onChangeMock).toHaveBeenCalledTimes(3);


        // @ts-ignore
        //fireEvent.change(screen.getBy('param-text-field-test-id', { target: { value: 'foo' } }));

        //expect(onChangeMock.mock.calls.length).toBe(1);

        //expect(screen.getByTestId("param-text-field-test-id")).toBeInTheDocument();
    })
})