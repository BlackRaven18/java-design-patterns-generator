import java.util.List;

public class $CONCRETE_ITERATOR_CLASS_NAME$ implements $ITERATOR_CLASS_NAME$ {

    private List<Object> collection;
    private int iterationState;

    public $CONCRETE_ITERATOR_CLASS_NAME$(List<Object> collection) {
        this.collection = collection;
        this.iterationState = 0;
    }

    @Override
    public Object $FIRST_METHOD_NAME$() {
        return collection.get(0);
    }

    @Override
    public Object $NEXT_METHOD_NAME$() {
        if (this.$ISDONE_METHOD_NAME$()) {
           return collection.get(iterationState++);
        } else {
            return null;
        }
    }

    @Override
    public boolean $ISDONE_METHOD_NAME$() {
        return iterationState < collection.size();
    }

    @Override
    public Object $CURRENTITEM_METHOD_NAME$() {
        return collection.get(iterationState);
    }
}
