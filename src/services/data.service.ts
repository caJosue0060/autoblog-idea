import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, addDoc, updateDoc, deleteDoc, query, orderBy, where, getDoc } from '@angular/fire/firestore';
import { Observable, from, BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category, Thesis, Citation, Note, Objection } from '../models/interfaces';
import { getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private firestore = inject(Firestore);

  private messageSubject = new BehaviorSubject<{type: 'success' | 'error', message: string} | null>(null);
  public message$ = this.messageSubject.asObservable();

  // Categories
  getCategories(): Observable<Category[]> {
    const categoriesRef = collection(this.firestore, 'categories');
    const q = query(categoriesRef, orderBy('order'));
    return collectionData(q, { idField: 'id' }) as Observable<Category[]>;
  }

  getCategoryBySlug(slug: string): Observable<Category | null> {
    return this.getCategories().pipe(
      map(categories => categories.find(cat => cat.slug === slug) || null)
    );
  }

  async addCategory(category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
    try {
      const categoriesRef = collection(this.firestore, 'categories');
      await addDoc(categoriesRef, {
        ...category,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      this.showMessage('success', 'Category added successfully');
    } catch (error) {
      this.showMessage('error', 'Failed to add category');
    }
  }

  async updateCategory(id: string, category: Partial<Category>): Promise<void> {
    try {
      const categoryRef = doc(this.firestore, `categories/${id}`);
      await updateDoc(categoryRef, { ...category, updatedAt: new Date() });
      this.showMessage('success', 'Category updated successfully');
    } catch (error) {
      this.showMessage('error', 'Failed to update category');
    }
  }

  async deleteCategory(id: string): Promise<void> {
    try {
      const categoryRef = doc(this.firestore, `categories/${id}`);
      await deleteDoc(categoryRef);
      this.showMessage('success', 'Category deleted successfully');
    } catch (error) {
      this.showMessage('error', 'Failed to delete category');
    }
  }

  // Theses
  getTheses(): Observable<Thesis[]> {
    const thesesRef = collection(this.firestore, 'theses');
    const q = query(thesesRef, orderBy('order'));
    return collectionData(q, { idField: 'id' }) as Observable<Thesis[]>;
  }

  getThesesByCategory(categoryId: string): Observable<Thesis[]> {
    const thesesRef = collection(this.firestore, 'theses');
    const q = query(thesesRef, where('categoryId', '==', categoryId), orderBy('order'));
    return collectionData(q, { idField: 'id' }) as Observable<Thesis[]>;
  }

  getThesisBySlug(slug: string): Observable<Thesis | null> {
    return from(this.getThesisBySlugPromise(slug));
  }

  private async getThesisBySlugPromise(slug: string): Promise<Thesis | null> {
  const thesesRef = collection(this.firestore, 'theses');
  const q = query(thesesRef, where('slug', '==', slug));
  const querySnapshot = await getDocs(q);

  const theses: Thesis[] = querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data['title'],
      slug: data['slug'],
      author: data['author'],
      year: data['year'],
      order: data['order'],
      categoryId: data['categoryId'],
      createdAt: data['createdAt'],
      updatedAt: data['updatedAt']
    };
  });

  return theses.length > 0 ? theses[0] : null;
}


  async addThesis(thesis: Omit<Thesis, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
    try {
      const thesesRef = collection(this.firestore, 'theses');
      await addDoc(thesesRef, {
        ...thesis,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      this.showMessage('success', 'Thesis added successfully');
    } catch (error) {
      this.showMessage('error', 'Failed to add thesis');
    }
  }

  async updateThesis(id: string, thesis: Partial<Thesis>): Promise<void> {
    try {
      const thesisRef = doc(this.firestore, `theses/${id}`);
      await updateDoc(thesisRef, { ...thesis, updatedAt: new Date() });
      this.showMessage('success', 'Thesis updated successfully');
    } catch (error) {
      this.showMessage('error', 'Failed to update thesis');
    }
  }

  async deleteThesis(id: string): Promise<void> {
    try {
      const thesisRef = doc(this.firestore, `theses/${id}`);
      await deleteDoc(thesisRef);
      this.showMessage('success', 'Thesis deleted successfully');
    } catch (error) {
      this.showMessage('error', 'Failed to delete thesis');
    }
  }

  // Citations
  getCitations(): Observable<Citation[]> {
    const citationsRef = collection(this.firestore, 'citations');
    const q = query(citationsRef, orderBy('order'));
    return collectionData(q, { idField: 'id' }) as Observable<Citation[]>;
  }

  getCitationsByThesis(thesisId: string): Observable<Citation[]> {
    const citationsRef = collection(this.firestore, 'citations');
    const q = query(citationsRef, where('thesisId', '==', thesisId), orderBy('order'));
    return collectionData(q, { idField: 'id' }) as Observable<Citation[]>;
  }

  async addCitation(citation: Omit<Citation, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
    try {
      const citationsRef = collection(this.firestore, 'citations');
      await addDoc(citationsRef, {
        ...citation,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      this.showMessage('success', 'Citation added successfully');
    } catch (error) {
      this.showMessage('error', 'Failed to add citation');
    }
  }

  async updateCitation(id: string, citation: Partial<Citation>): Promise<void> {
    try {
      const citationRef = doc(this.firestore, `citations/${id}`);
      await updateDoc(citationRef, { ...citation, updatedAt: new Date() });
      this.showMessage('success', 'Citation updated successfully');
    } catch (error) {
      this.showMessage('error', 'Failed to update citation');
    }
  }

  async deleteCitation(id: string): Promise<void> {
    try {
      const citationRef = doc(this.firestore, `citations/${id}`);
      await deleteDoc(citationRef);
      this.showMessage('success', 'Citation deleted successfully');
    } catch (error) {
      this.showMessage('error', 'Failed to delete citation');
    }
  }

  // Notes
  getNotesByCitation(citationId: string): Observable<Note[]> {
    const notesRef = collection(this.firestore, 'notes');
    const q = query(notesRef, where('citationId', '==', citationId), orderBy('position'));
    return collectionData(q, { idField: 'id' }) as Observable<Note[]>;
  }

  async addNote(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
    try {
      const notesRef = collection(this.firestore, 'notes');
      await addDoc(notesRef, {
        ...note,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      this.showMessage('success', 'Note added successfully');
    } catch (error) {
      this.showMessage('error', 'Failed to add note');
    }
  }

  async updateNote(id: string, note: Partial<Note>): Promise<void> {
    try {
      const noteRef = doc(this.firestore, `notes/${id}`);
      await updateDoc(noteRef, { ...note, updatedAt: new Date() });
      this.showMessage('success', 'Note updated successfully');
    } catch (error) {
      this.showMessage('error', 'Failed to update note');
    }
  }

  async deleteNote(id: string): Promise<void> {
    try {
      const noteRef = doc(this.firestore, `notes/${id}`);
      await deleteDoc(noteRef);
      this.showMessage('success', 'Note deleted successfully');
    } catch (error) {
      this.showMessage('error', 'Failed to delete note');
    }
  }

  // Objections
  getObjectionsByThesis(thesisId: string): Observable<Objection[]> {
    const objectionsRef = collection(this.firestore, 'objections');
    const q = query(objectionsRef, where('thesisId', '==', thesisId), orderBy('order'));
    return collectionData(q, { idField: 'id' }) as Observable<Objection[]>;
  }

  async addObjection(objection: Omit<Objection, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
    try {
      const objectionsRef = collection(this.firestore, 'objections');
      await addDoc(objectionsRef, {
        ...objection,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      this.showMessage('success', 'Objection added successfully');
    } catch (error) {
      this.showMessage('error', 'Failed to add objection');
    }
  }

  async updateObjection(id: string, objection: Partial<Objection>): Promise<void> {
    try {
      const objectionRef = doc(this.firestore, `objections/${id}`);
      await updateDoc(objectionRef, { ...objection, updatedAt: new Date() });
      this.showMessage('success', 'Objection updated successfully');
    } catch (error) {
      this.showMessage('error', 'Failed to update objection');
    }
  }

  async deleteObjection(id: string): Promise<void> {
    try {
      const objectionRef = doc(this.firestore, `objections/${id}`);
      await deleteDoc(objectionRef);
      this.showMessage('success', 'Objection deleted successfully');
    } catch (error) {
      this.showMessage('error', 'Failed to delete objection');
    }
  }

  private showMessage(type: 'success' | 'error', message: string): void {
    this.messageSubject.next({ type, message });
    setTimeout(() => {
      this.messageSubject.next(null);
    }, 5000);
  }

  clearMessage(): void {
    this.messageSubject.next(null);
  }
}