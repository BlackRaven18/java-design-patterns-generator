public class Context {

    private State state;

    public Context(State initialState) {
        this.state = initialState;
    }

    public void changeState(State state){
        this.state = state;
    }

    public void request(){
        state.handle();
    }


}
