public class ConcreteCommand implements Command{

    private Receiver receiver;
    private Client state;

    public ConcreteCommand(Receiver receiver, Client state) {
        this.receiver = receiver;
        this.state = state;
    }

    @Override
    public void execute() {
        receiver.action();
    }
}
