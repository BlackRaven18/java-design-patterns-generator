import java.util.ArrayList;
import java.util.List;

public abstract class $SUBJECT_CLASS_NAME$ {

    protected List<$OBSERVER_CLASS_NAME$> observers;

    public $SUBJECT_CLASS_NAME$(){
        this.observers = new ArrayList<>();
    }

    public void attach($OBSERVER_CLASS_NAME$ observer){
        observers.add(observer);
    }

    public void detach($OBSERVER_CLASS_NAME$ observer){
        observers.remove(observer);
    }

    public void notifyObservers(){
        for($OBSERVER_CLASS_NAME$ observer : observers){
            observer.$UPDATE_METHOD_NAME$();
        }
    }
}
