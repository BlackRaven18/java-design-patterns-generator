import java.util.ArrayList;

public class $FLYWEIGHT_FACTORY_CLASS_NAME$ {

    private ArrayList<$FLYWEIGHT_CLASS_NAME$> flyweights;

    public $FLYWEIGHT_FACTORY_CLASS_NAME$(){
        this.flyweights = new ArrayList<>();
    }

    public $FLYWEIGHT_CLASS_NAME$ getFlyweight(int key){
        if(key >= 0 && key < flyweights.size()){
            return flyweights.get(key);
        } else {
            $FLYWEIGHT_CLASS_NAME$ flyweight = new ConcreteFlyweight("intrinsicState");
            flyweights.add(flyweight);
            return flyweight;
        }
    }
}
