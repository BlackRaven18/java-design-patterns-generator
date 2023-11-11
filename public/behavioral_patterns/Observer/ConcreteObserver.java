public class ConcreteObserver implements Observer{

    private State observerState;
    private ConcreteSubject subject;

    public ConcreteObserver(ConcreteSubject subject){
        observerState = State.DEFAULT_STATE;
        this.subject = subject;
    }
    @Override
    public void update() {
        observerState = subject.getSubjectState();
    }
}
