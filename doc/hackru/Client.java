package hackru;

import javax.swing.Action;

public abstract class Client {

	public abstract void onActionSignal(Action action);

	public abstract void sendScore();

	public abstract void sendVote();

}
