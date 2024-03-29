import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { TowerSchema } from '../models/Tower.js';
import { TicketSchema } from '../models/Ticket.js';
import { CommentSchema } from '../models/Comment.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Towers = mongoose.model('Tower', TowerSchema)
  
  Tickets = mongoose.model('Ticket', TicketSchema)
  
  Comments = mongoose.model('Comment', CommentSchema)
}

export const dbContext = new DbContext()
