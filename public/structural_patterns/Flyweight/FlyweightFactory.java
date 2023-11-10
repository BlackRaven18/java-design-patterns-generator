import java.util.ArrayList;

public class FlyweightFactory {

    private ArrayList<Flyweight> flyweights;

    public FlyweightFactory(){
        this.flyweights = new ArrayList<>();
    }

    public Flyweight getFlyweight(int key){
        if(key >= 0 && key < flyweights.size()){
            return flyweights.get(key);
        } else {
            Flyweight flyweight = new ConcreteFlyweight("intrinsicState");
            flyweights.add(flyweight);
            return flyweight;
        }
    }
}
