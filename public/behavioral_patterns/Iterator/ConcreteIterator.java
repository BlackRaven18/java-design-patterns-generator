import java.util.List;

public class ConcreteIterator implements Iterator {

    private List<Object> collection;
    private int iterationState;

    public ConcreteIterator(List<Object> collection) {
        this.collection = collection;
        this.iterationState = 0;
    }

    @Override
    public Object first() {
        return collection.get(0);
    }

    @Override
    public Object next() {
        if (this.isDone()) {
           return collection.get(iterationState++);
        } else {
            return null;
        }
    }

    @Override
    public boolean isDone() {
        return iterationState < collection.size();
    }

    @Override
    public Object currentItem() {
        return collection.get(iterationState);
    }
}
