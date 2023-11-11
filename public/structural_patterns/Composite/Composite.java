import java.util.ArrayList;

public class $COMPOSITE_CLASS_NAME$ extends $COMPONENT_CLASS_NAME${

    private ArrayList<$COMPONENT_CLASS_NAME$> children;

    public $COMPOSITE_CLASS_NAME$(){
        this.children = new ArrayList<>();
    }

    @Override
    public void $OPERATION_METHOD_NAME$() {
        for($COMPONENT_CLASS_NAME$ child : children){
            child.$OPERATION_METHOD_NAME$();
        }
    }

    @Override
    public void $ADD_METHOD_NAME$($COMPONENT_CLASS_NAME$ component) {
        children.add(component);
    }

    @Override
    public void $REMOVE_METHOD_NAME$($COMPONENT_CLASS_NAME$ component) {
        children.remove(component);
    }

    @Override
    public $COMPONENT_CLASS_NAME$ $GETCHILD_METHOD_NAME$(int childIndex) {
        return children.get(childIndex);
    }
}
