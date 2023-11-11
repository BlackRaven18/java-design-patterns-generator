public class ConcreteState implements State{

    private Context context;

    public ConcreteState(){
        this.context = new Context(this);
    }

    public ConcreteState(Context context) {
        this.context = context;
    }

    public void setContext(Context context) {
        this.context = context;
    }

    @Override
    public void handle() {
        //handle
    }
}
