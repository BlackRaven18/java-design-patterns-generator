import java.util.ArrayList;
import java.util.List;

public class $CONCRETE_AGGREGATE_CLASS_NAME$ implements $AGGREGATE_CLASS_NAME${

    private List<Object> items;

    public $CONCRETE_AGGREGATE_CLASS_NAME$(){
        this.items = new ArrayList<>();
    }

    public void add(Object item){
        items.add(item);
    }

    @Override
    public $ITERATOR_CLASS_NAME$ createIterator() {
        return new $CONCRETE_ITERATOR_CLASS_NAME$(items);
    }
}
