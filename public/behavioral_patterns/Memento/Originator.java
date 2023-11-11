public class Originator {

    private String state;

    public void setMemento(Memento memento){
        this.state = memento.getState();
    }

    public Memento createMemento(){
        return new Memento(state);
    }
}
