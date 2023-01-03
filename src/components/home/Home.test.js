import { fireEvent, render, screen } from '@testing-library/react';
import Home from './Home';
import { Provider } from "react-redux";
import createStore from "../../store/createStore";

describe('Home Component', () => {
//   expect(true).toBe(true);
    it("tests search functionality", ()=>{
        render(
            <Provider store={createStore()}>
                <Home />
            </Provider>
        );
        const userInput = screen.getByTestId("search-input")
        expect(userInput).toBeInTheDocument();
        fireEvent.change(userInput, {target : {value : "campaign"}});
    })    
    it("tests date functionality", ()=>{
        render(
            <Provider store={createStore()}>
                <Home />
            </Provider>
        );
        const startDate = screen.getByTestId("start-date");
        const endDate = screen.getByTestId("end-date");
        expect(startDate).toBeInTheDocument();
        expect(endDate).toBeInTheDocument();
        fireEvent.change(startDate, {target : {value : "03/29/2019"}});
        fireEvent.change(endDate, {target : {value : "03/29/2022"}});
    })
});
