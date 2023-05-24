import { deleteServices, putServices, postServices } from '../../utils/hooks/services';
import { updateMessage } from '../../redux/actions/message';

const template = (setVal, setShowNotes, dispatch, val) => {
    setVal(!val)
    setShowNotes(false)
    dispatch(updateMessage({ body: 'Realizado con éxito', open: true, type: 'success' }))
}

// notes
export const updateNote = (setLoading, setVal, val, setShowNotes, infoUserSubj, form, dispatch) => {
    setLoading(true)
    putServices(`user-subject/update/${infoUserSubj.USERSUBJECT}`, form, 'application/json').then(() => {
        template(setVal, setShowNotes, dispatch, val)
    }).catch(() => {
        dispatch(updateMessage({ body: 'Ocurrió un error', open: true, type: 'danger' }))
    }).finally(() => {
        setLoading(false)
    })
}
export const createNote = (id, setLoading, setInfoUserSubj, infoUserSubj, setShowNotes, setShowWarning, setUpdater, updater, userdata) => {
    setLoading(true)
    postServices('user-subject/create', { user_id: userdata.id, subject_id: id, score: 1 }).then(({ data }: any) => {
        setInfoUserSubj({
            ...infoUserSubj, finish: 0, extra_score: [], score: data.score, USERSUBJECT: data.id, user_id: data.user_id, subject_id: data.subject_id,
        })
        setShowNotes(true);
    }).finally(() => {
        setLoading(false)
        setShowWarning(false)
        setUpdater(!updater)
    })
}
export const deleteNote = (setLoading, setVal, val, setShowNotes, infoUserSubj, dispatch) => {
    setLoading(true)
    deleteServices(`user-subject/delete/${infoUserSubj.USERSUBJECT}`).then(() => {
        template(setVal, setShowNotes, dispatch, val)
    }).catch(() => {
        dispatch(updateMessage({ body: 'Ocurrió un error', open: true, type: 'danger' }))
    }).finally(() => {
        setLoading(false)
    })
}

// sub notes
export const deletePartial = (id, setLoading, setVal, val, setShowNotes, setShowModal2, showModal2, dispatch) => {
    setLoading(true)
    deleteServices(`extra-score/delete/${id}`).then(() => {
        setShowModal2({ ...showModal2, state: false });
        template(setVal, setShowNotes, dispatch, val)
    }).catch(() => {
        dispatch(updateMessage({ body: 'Ocurrió un error', open: true, type: 'danger' }))
    }).finally(() => {
        setLoading(false)
    })
}
export const updateOrCreateScorePartial = (id, setLoading, showModal2, infoUserSubj, setVal, val, setShowModal2, setShowNotes, dispatch) => {
    setLoading(true)
    let method, data
    data = { name: showModal2.name, score: showModal2.score, user_subject_id: infoUserSubj.USERSUBJECT }
    id ? method = putServices(`extra-score/update/${id}`, data, 'application/json'): method = postServices(`extra-score/create`, data, 'application/json')
    method.then(() => {
        setShowModal2({ ...showModal2, state: false });
        template(setVal, setShowNotes, dispatch, val)
    }).catch(() => {
        dispatch(updateMessage({ body: 'Ocurrió un error', open: true, type: 'danger' }))
    }).finally(() => {
        setLoading(false)
    })
}