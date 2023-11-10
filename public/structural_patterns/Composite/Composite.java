import java.util.ArrayList;

public class Composite implements Component{

    private ArrayList<Composite> children;

    public Composite(){
        this.children = new ArrayList<>();
    }

    @Override
    public void operation() {
        for(Composite child : children){
            child.operation();
        }
    }

    @Override
    public void add(Component component) {

    }

    @Override
    public void remove(Component component) {

    }

    @Override
    public Component getChild(int childIndex) {
        return null;
    }
}
